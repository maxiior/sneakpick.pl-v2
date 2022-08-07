# pull official base image
FROM python:3.9.6-alpine

# set work directory
WORKDIR /usr/src/Django

# Install gcc
RUN apk update && apk add python3-dev gcc libc-dev libffi-dev

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .
