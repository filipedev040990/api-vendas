#!/bin/bash
service docker start
docker start postgres
docker start redis
docker ps
