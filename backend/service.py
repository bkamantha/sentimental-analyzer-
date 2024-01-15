import numpy as np
import pandas as pd
import re
import string
import pickle

from nltk.stem import PorterStemmer

ps = PorterStemmer()


def remove_punctuations(text):
    for punctuation in string.punctuation:
        text = text.replace(punctuation, "")
    return text


with open("data/model.pickle", "rb") as f:
    model = pickle.load(f)

with open("data/stopwords_english", "r") as file:
    sw = file.read().splitlines()

vocab = pd.read_csv("data/vocab.txt", header=None)
tokens = vocab[0].tolist()


def preprocessing(text):
    return (
        pd.DataFrame([text], columns=["tweet"])["tweet"]
        .apply(lambda x: " ".join(x.lower() for x in x.split()))
        .apply(
            lambda x: " ".join(
                re.sub(r"^https?:\/\/.*[\r\n]*", "", x, flags=re.MULTILINE)
                for x in x.split()
            )
        )
        .apply(remove_punctuations)
        .str.replace("\\d+", "", regex=True)
        .apply(lambda x: " ".join(x for x in x.split() if x not in sw))
        .apply(lambda x: " ".join(ps.stem(x) for x in x.split()))
    )


def vectorizer(ds, vocabulary):
    vectorized_list = []
    for sentence in ds:
        sentence_list = np.zeros(len(vocabulary))

        for i in range(len(vocabulary)):
            if vocabulary[i] in sentence.split():
                sentence_list[i] = 1

        vectorized_list.append(sentence_list)

    vectorized_new_list = np.asarray(vectorized_list, dtype=np.float32)
    return vectorized_new_list


def get_prediction(vectorized_text):
    prediction = model.predict(vectorized_text)
    if prediction == 1:
        return "negative"
    else:
        return "positive"


def process_comment(comment):
    preprocessed_txt = preprocessing(comment)
    vectorized_txt = vectorizer(preprocessed_txt, tokens)
    prediction = get_prediction(vectorized_txt)
    print(comment, prediction)
    return prediction
