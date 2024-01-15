from openai import OpenAI

client = OpenAI(api_key="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")


def generate_gpt_response(user_message):
    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": user_message,
            }
        ],
        model="gpt-3.5-turbo",
    )
    response_message = response.choices[0].message.content
    return response_message
