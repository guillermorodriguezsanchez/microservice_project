
# Microservices Project with NodeJs, Docker, Consul, Caddy, RabbitMQ, and DevOps Pipeline
This project demonstrates how developing with microservices changes the typical development style. We will be using NodeJs, Docker, Consul, Caddy, RabbitMQ, and a DevOps Pipeline. The goal is to create a web application that allows users to add events, reserve tickets, and view event information, among other things.

## Requirements
The web application should be able to perform the following tasks:

- Calling http://localhost/addevent?name=event&date=20221004&tickets=20 adds an event to the database for the 4th of October with a maximum of 20 tickets and returns the id. If an event with the same name exists on the given day, return an error.
- Calling http://localhost/deleteevent?id=(id) deletes the event with the specified id. If there is no event with that id, return a success message.
- Calling http://localhost/events lists all events (including id, name, date, max. no. of tickets, no. of sold tickets, no. of remaining tickets).
- Calling http://localhost/reserveticket?event=(id)&name=Micky%20Mouse reserves one ticket for Micky Mouse, stores the day when the ticket was sold, and returns the id. If no more tickets are available, return an error code.
- Calling http://localhost/deleteticket?id=(id) deletes the ticket with the specified id. If there is no ticket with that id, return a success message.
- Calling http://localhost/tickets lists all tickets that were bought (id, event id, and date when it was sold).
- Calling http://localhost/searchtickets?date=20221004&tickets=2 returns all events on the 4th of October with at least 2 tickets left.
## Architecture
The project uses a microservices architecture that consists of the following services:

- addevent: Responsible for adding events to the database.
- deleteevent: Responsible for deleting events from the database.
- getevents: Responsible for fetching events from the database.
- reserveticket: Responsible for reserving tickets for a specific event.
- deleteticket: Responsible for deleting tickets from the database.
- gettickets: Responsible for fetching all tickets from the database.
- searchtickets: Responsible for searching for events with available tickets based on a specific date and ticket number.
The communication between services is done through RabbitMQ. Each service has its own Docker container, and they are all orchestrated using Consul. Caddy is used as the web server.

## DevOps Pipeline
### The DevOps Pipeline for this project includes the following steps:
The pipeline is set up using GitLab CI/CD, and it is triggered whenever changes are pushed to the repository.

## Unit Tests
Unit tests have been added to each service to ensure that the functions return the expected values. They can be run by running `

## Folders

There are two folders:
- Folder 1 (step1) : In this one you can see the project with Unit Tests, Docker all in one with one database without using RabbitMQ, Caddy or Consul.
- Folder 2 (step2) : In this one you will see the final project with every parts.
