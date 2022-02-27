FROM python:3.9.10

RUN apt-get update \
&& apt-get install -y postgresql postgresql-contrib libpq-dev python3-dev tree

ENV PYTHONUNBUFFERED 1

RUN pip3 install --upgrade pip


COPY todo_note/ ./
COPY wait-for-postgres.sh .

RUN chmod +x wait-for-postgres.sh

RUN pip3 install -r requirements.txt

RUN tree -L 1

RUN pip3 install gunicorn
