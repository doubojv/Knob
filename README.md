# Knob

## **Pendências Features**

 **Implementar seguintes Features:**
 - ⚡️Home Page 

## Conectando ao MySQL
Run the following command

```bash
  \sql
```
then
```bash
  \connect root@localhost
```


## API Key

Acesse para conseguir a API Key pelo TMDB:

[API Key](https://developer.themoviedb.org/docs/getting-started)


## Rotas até agora

#### Get all users

```http
  GET /users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| - | -| **Required**. None |

#### Get watchlist

```http
  GET /watchlist
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| -     | - | **Required**. None |

#### Get shows

```http
  GET /shows/:tmdbId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `tmdbid`      | `number` | **Required**. Id da serie no TMDB|

#### Sync show from TMDB

```http
  POST /shows/sync/:tmdbId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `tmdbid`      | `number` | **Required**. Id da serie no TMDB|


#### Add to watchlist

```http
  POST /watchlist
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_user`      | `number` | **Required**. Id do user|
| `id_show`      | `number` | **Required**. Id da série|







 