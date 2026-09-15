from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from gemini_client import invoke_with_fallback


async def subject_chatbot(history: dict, subject: str) -> dict:
    """
    Handles chatbot conversation restricted strictly to a given subject.
    
    Parameters:
        history (dict): A dictionary structured as {"messages": [{"role": "user"|"ai", "content": "..."}]}
        subject (str): The subject to restrict the chatbot responses to.
        
    Returns:
        dict: The updated history dictionary containing the new AI message.
    """
    # System prompt enforcing the subject boundary
    system_prompt_text = (
        f"You are a helpful academic tutor specializing exclusively in {subject}. "
        f"Your task is to answer user questions related to {subject}.\n\n"
        f"CRITICAL RULE: If the user's latest message or question is not related to {subject}, "
        f"you MUST NOT answer the question. Instead, respond EXACTLY with: "
        f"\"I can only answer questions related to {subject}.\""
    )

    # Convert dictionary history into LangChain message objects
    formatted_messages = [SystemMessage(content=system_prompt_text)]

    for msg in history.get("messages", []):
        if msg["role"] == "user":
            formatted_messages.append(HumanMessage(content=msg["content"]))
        elif msg["role"] == "ai":
            formatted_messages.append(AIMessage(content=msg["content"]))

    ai_response = await invoke_with_fallback(
        formatted_messages,
        lambda llm: llm,
        preferred_key=3,
        temperature=0.3,
    )

    response_content = ai_response.content
    if isinstance(response_content, list):
        response_content = ''.join(
            item.get('text', '') if isinstance(item, dict) else str(item)
            for item in response_content
        )

    # Append AI response to the history dictionary
    history["messages"].append({
        "role": "ai",
        "content": response_content
    })

    return history


# Example Usage
if __name__ == "__main__":
    conversation_history = {
        "messages": [
            {"role": "user", "content": "What is Newton's second law?"},
            {"role": "ai", "content": "Newton's second law states that Force equals mass times acceleration (F = ma)."},
            {"role": "user", "content": "Can you tell me a recipe for chocolate cake?"}
        ]
    }

    current_subject = "Physics"

    updated_history = subject_chatbot(
        history=conversation_history, 
        subject=current_subject
    )

    # Print the latest response added to history
    print("Latest AI Response:")
    print(updated_history["messages"][-1]["content"])