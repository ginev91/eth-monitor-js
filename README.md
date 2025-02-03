# Ethereum Transaction Monitor

## Setup

```bash
git clone <repo-url>
cd eth-monitor
npm install
npm run dev 

# I tried to show several aproaches Dependency injection (without using a library by passing dependecies Configuration, Transaction, and sequelize) helps with scalability, Factory Pattern by creating crudController for any entity needed promotes reusability and separation of concerns and also listening on the websocket for pending transactions, although still getting some errors there.
# using sqlite::memory due to in order to make it easier when testing 
