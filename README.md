API de Consultas de Ofertas de Bolsa de Estudo
Esta API permite consultar e filtrar ofertas de bolsas de estudo, facilitando o acesso a informações sobre cursos, preços e instituições.

Funcionalidades
1. Leitura dos Dados
Os dados das ofertas são lidos a partir do arquivo data.json.
2. Listagem de Ofertas
Exibe todas as ofertas com as seguintes formatações:
Tipo de Curso: Presencial 🏫 ou EaD 🏠.
Nível: Graduação (bacharelado) 🎓, Graduação (tecnólogo) 🎓, Graduação (licenciatura) 🎓.
Preços: Formatados como moeda brasileira (ex: R$ 550,00).
Desconto: Calcula e exibe a porcentagem de desconto (ex: 27% 📉).
3. Filtros
Filtrar por:
Nível (graduação, tecnólogo, licenciatura) 🎓.
Tipo (presencial, EaD) 🏫.
Faixa de Preço (min e max).
Busca por Nome: Busca cursos com correspondência insensível a maiúsculas/minúsculas 🔄.
4. Ordenação
Ordenar por:
Nome do curso 📝.
Preço com desconto 📉.
Avaliação 🌟.
5. Paginação
Permite configurar a quantidade de itens por página e navegar entre as páginas.
6. Retorno de Propriedades Selecionadas
Permite selecionar quais propriedades retornar na consulta (ex: courseName).
Como Usar

Utilize um cliente HTTP (como Postman ou curl) para fazer requisições ao endpoint:
bash
Copiar código
http://localhost:3000/offers
Exemplos de Requisições
Listar todas as ofertas:

bash
Copiar código
GET http://localhost:3000/offers
Filtrar por nível e tipo:

bash
Copiar código
GET http://localhost:3000/offers?level=bacharelado&kind=presencial
Ordenar e paginar:

bash
Copiar código
GET http://localhost:3000/offers?sort=rating&page=2&limit=5
Selecionar propriedades:

bash
Copiar código
GET http://localhost:3000/offers?fields=courseName,rating
Tecnologias Usadas
Node.js
Express
JSON