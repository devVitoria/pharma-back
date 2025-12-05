INSTANCIA 
    rodando docker compose up -d
    as imagens subirão e o projeto estará pronto para testes

    é necessário rodar
    docker exec -it pharma_api sh
    quando entrar em #app rode o comando abaixo
    npx prisma migrate deploy

após a imagem subir para que as tabelas estejam ok




PROJETO
    Pharma-microservices - Gerenciamento de manipulados para farmácias
    Vitória Aparecida dos Santos - matrícula 202881

FERRAMENTAS
    Docker - Postgres - Prisma - NestJs - Swagger - RabbitMQ - ConsoleLogger - Super Test

TESTES 
    Realizado um unitário em products - criação  - Utilizei JEST
    Reaizado um de integração em order com o product - Utilizei SUPERTEST

    rode
        yarn test ou npm test


DESCRIÇÃO
A intenção do projeto é gerenciar uma aplicação farmaceutica que recebe pedidos de manipulados. 

A lógica se concentra em três agregados dentro de um microserviço

- CUSTOMER

- ORDER

- PRODUCT

Um cliente cria a sua conta e pode criar um pedido, ele pode criar seu pedido com os produtos previamente cadastrados, caso ele precise de um que não está no catálogo, ele pode criar um CustomProduct, uma encomenda personalizada, cabe a farmácia aceitar ou não esse produto.
Apenas um administrador pode criar produtos padrões. Apenas um cliente pode solicitar produtos customizados.

Algumas APIS emitem eventos determinísticos para o segundo microserviço, o de sub, que recebe informações quando um usuário é criado, deletado ou quando um custom product é criado, este por sua vez, recebe os eventos e utiliza logs do ConsoleLogger para logá-los.


Type	To	Routing key	Arguments	
queue	main_queue	customer.created	
{}
Unbind
queue	main_queue	customer.deleted	
{}
Unbind
queue	main_queue	product_custom.created	
{}
Unbind
