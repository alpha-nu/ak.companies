#!/bin/bash

docker-compose exec ak.companies.db sh -c "mysql < /scripts/init.sql"