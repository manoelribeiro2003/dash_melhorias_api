# Tarefas Pendentes

## Usuários

* [ ] Revisar a resposta retornada após a criação de um usuário.

  * Verificar se todos os campos retornados atualmente fazem sentido para o cliente.
  * Avaliar quais campos devem ser exibidos na resposta e quais devem permanecer apenas internos da aplicação.
  * Criar uma estrutura de resposta adequada caso seja necessário retornar apenas determinados campos do usuário.
  * Garantir que informações sensíveis ou desnecessárias não sejam expostas na resposta da API.

# Executar alterações em relação a migrations:

Na pasta da API, executar os comandos abaixo na ordem.

### 1. Atualizar o código
```bash
git pull
```

### 2. Instalar novas dependencias
```bash
npm install
```
### 3. Gerar o build
```bash
npm run build
```
### 4. Gerar migrations
```bash
npx typeorm-ts-node-commonjs migration:generate src/app/migrations/AdicionarPrioridadeProjeto -d src/app/data-source.ts
```
### 5. Executar migrations
```bash
npx typeorm-ts-node-commonjs migration:run -d src/app/data-source.ts
```
### 6. Verificar migrations
```bash
npx typeorm-ts-node-commonjs migration:show -d src/app/data-source.ts
```
### 7. Reverter a ultima migration executada
```bash
npx typeorm-ts-node-commonjs migration:revert -d src/app/data-source.ts
```