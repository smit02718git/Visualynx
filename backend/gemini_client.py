import os
import re
from collections.abc import Callable, Sequence
from typing import Any

from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

DEFAULT_MODEL = "gemini-3.5-flash"
SERVICE_UNAVAILABLE_MODEL = "gemini-3.6-flash"
API_KEY_SLOTS = tuple(range(1, 7))


def _key_order(preferred_key: int) -> list[int]:
    fallback_slots = API_KEY_SLOTS if preferred_key == 1 else tuple(range(2, 7))
    return [preferred_key, *(key for key in fallback_slots if key != preferred_key)]


def _is_service_unavailable(error: Exception) -> bool:
    status_code = getattr(error, "status_code", None) or getattr(error, "code", None)
    return status_code == 503 or bool(re.search(r"\b503\b|service unavailable", str(error), re.IGNORECASE))


def _client(model: str, api_key: str, temperature: float, timeout: int, max_retries: int) -> ChatGoogleGenerativeAI:
    return ChatGoogleGenerativeAI(
        model=model,
        google_api_key=api_key,
        temperature=temperature,
        timeout=timeout,
        max_retries=max_retries,
    )


async def invoke_with_fallback(
    messages: Sequence[Any],
    build_runnable: Callable[[ChatGoogleGenerativeAI], Any],
    *,
    preferred_key: int,
    temperature: float = 0.2,
    timeout: int = 60,
    max_retries: int = 0,
) -> Any:
    last_error: Exception | None = None
    model = DEFAULT_MODEL

    for key_slot in _key_order(preferred_key):
        api_key = os.getenv(f"GEMINI_API_KEY_{key_slot}")
        if not api_key:
            continue

        try:
            runnable = build_runnable(_client(model, api_key, temperature, timeout, max_retries))
            return await runnable.ainvoke(messages)
        except Exception as error:
            last_error = error
            if _is_service_unavailable(error):
                model = SERVICE_UNAVAILABLE_MODEL

    if last_error:
        raise RuntimeError("All configured Gemini API keys failed.") from last_error
    raise ValueError("No Gemini API keys are configured in server settings.")