# Cronos

Esta é uma API de artigos criada com o intuito de estudo. Através dela, pude aprender sobre arquitetura limpa, design patterns, testes unitários, testes de integração, princípios do SOLID e Docker.


## Rodando localmente

Instale as dependências

```bash
  pnpm install
```

Inicie o servidor

```bash
  pnpm run dev
```
## Rodando com docker
```bash
  docker compose up
```



## Rodando os testes

Para rodar os testes, rode o seguinte comando

Roda todos os teste -->
```bash
  pnpm run test
```

teste unitarios -->
```bash
  pnpm run test:unit
```

teste integração -->
```bash
  pnpm run test:integration
```


## Documentação da API

#### Cria um artigo

```http
  POST /api/article
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `img` | `strin/Base64/link` | **Obrigatório**. exemplo -> data:image/jpeg;base64,/9j23... |
| `title` | `string` | **Obrigatório**. exemplo -> Titulo do artigo |
| `article` | `string` | **Obrigatório**. exemplo -> conteudo |


#### Resposta
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id`      | `string` | 'd7347345fd...'|
| `img` | `strin/Base64/link` |  data:image/jpeg;base64,/9j23... |
| `title` | `string` | Titulo do artigo |
| `article` | `string` | conteudo... |
| `createdAt` | `string` | 2024-03-22T11:50:11.816Z |


	
 


#### Retorna um artigo

```http
  GET /api/article/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Resposta
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id`      | `string` | 'd7347345fd...'|
| `img` | `strin/Base64/link` |  data:image/jpeg;base64,/9j23... |
| `title` | `string` | Titulo do artigo |
| `article` | `string` | conteudo... |
| `createdAt` | `string` | 2024-03-22T11:50:11.816Z |

#### Retorna todos os artigo

```http
  GET /api/article
```

#### atualiza um artigo

```http
  PATCH /api/article/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `img` | `strin/Base64/link` | ** nao é Obrigatório**. exemplo -> data:image/jpeg;base64,/9j23... |
| `title` | `string` | ** nao é Obrigatório**. exemplo -> Update title |
| `article` | `string` | ** nao é Obrigatório***. exemplo -> conteudo |


#### Resposta
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id`      | `string` | 'd7347345fd...'|
| `img` | `strin/Base64/link` |  data:image/jpeg;base64,/9j23... |
| `title` | `string` | Update title |
| `article` | `string` | conteudo... |
| `createdAt` | `string` | 2024-03-22T11:50:11.816Z |

#### deleta um article

```http
  DELETE /api/article/:id
```
