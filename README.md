# Mini-Microservice_BlogApp
A simple blog containing post and comment feature with microservice style of implementation.


The blog website demonstrates the microservice concepts as I broke up the posts, comments, query and moderation services into independent services and communicate by the EventBus service.


Quick explanation for each service:

1. QueryService fetches all the posts and comments.

2. PostService creates Posts and sends the "PostCreated" json to EventBus for other services to fetch (eg. QueryService and CommentService).

3. CommentService creates Comments and sends the "CommentCreated" json to EventBus for other services to fetch (eg. QueryService and ModerationService).

4. ModerationService fetches comments from EventBus, wait for 5 seconds, and checks if the word contains "duck". If so, the comment is banned, else approved. Then send the Info to EventBus for other services to fetch (eg. QueryService).

5. EventBusServices acts as a simple Pub/Sub strucutre for broadcasting the event changes. There are many intricate MessageQueues such as Kafka, RabbitMQ,... to replace this little thing XD.


The following picture shows the access point of each service and how they communicate with each other.
![BlogAppRouting drawio-2](https://github.com/jimshao1999/Mini-Microservice_BlogApp/assets/46078933/64edf46f-b7e1-403c-a41d-aab2e35decad)
