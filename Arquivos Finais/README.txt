Instruções para compilar e modificar o código do aplicativo Corre Comigo! :

Primeiro deve se instalar alguns softwares em seu computador:
- Deve-se instalar o Node.js. (https://nodejs.org/en/).
- Dve-se instalar o GitBash (https://git-scm.com/download/win).
- Deve-se instalar o Visual Studio Code (https://code.visualstudio.com/).

- Para o smartphone, deve se instalar o aplicativo Expo, que pode ser facilmente
encontrado na PlayStore .

Para compilar o aplicativo, algumas bibliotecas precisam ser instaladas. Para isso,
deve-se abrir o node.js command prompt e utilizar o comando:

                    npm install nome_biblioteca

Com o fomato acima, as seguintes bibliotecas devem ser instaladas:

- react-native-elements
- react-native-datepicker
- firebase
- moment
- react-native-masked-text
- lodash
- react-native-menu
- react-native-scrollable-tab-view
- react-native-modal
- react-native-search-filter

Pelo node.js prompt de comando, navega-se até a paste onde se encontra os códigos
do aplicativo, então digita-se o comando

                            npm start

Com isso, o código irá compilar e gerar um QR Code que será lido pelo Expo em seu smartphone.
Assim, o aplicativo irá abrir em seu celular e está pronto para ser testado.
Qualquer modificação que for feita no código utilizando o Visual Studio Code (linguagem
Javascript), precisa ser salvo e então o aplicativo no celular irá compilar novamente
automaticamente, e então a modificação já pode ser testada.

Caso seja necessário realiar alteracoes no banco de dados utilizado, os eguintes passos 
devem ser seguidos:

- Primeiro deve se acessar o link do Firebase (https://firebase.google.com/).
- Logar com a conta do Corre Comigo.
- Selecionar o database do Corre Comigo.
- No menu lateral esquerdo, selecionar a opção database.
- Na nova tela aberta, é possivel verificar as tabelas e instâncias presentes no banco.
- É possível adicionar novas instâncias ou editar as existentes utilizando apenas a interface gráfica do Firebase.
- Caso seja necessário modificar as regras de acesso e segurança do banco, clicar na abra regras.

Obs: como o Firebase não é uma base de dados relacional, o frontend deve tratar os dados em situações
de escrita ou leitura. Mais informações no código do programa.