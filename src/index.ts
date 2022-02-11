/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { sortBy } from "sort-by-typescript";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

app.listen(PORT, async () => {
	console.log(`Listening on port ${PORT}`);


	// CÓDIGO PARA ATENDER OS REQUERIMENTOS
	// R01, R02, R03, R04, R05

	//Bloco de codigo responsavel por armazenar as entradas do usuario e imprimi-las no console

	const readline = require('readline');
	const r1 = readline.createInterface({
		input: process.stdin,
		output: process.stdout

	});

	//Função QUESTION que será usada nas demais perguntas

	const question = (str: string) => new Promise((resolve) => r1.question(str, resolve));

	//Classe aluno usando construtores de nome, idade e nota para distribuir no array corretamente
	class aluno {

		//Variaveis criadas como PUBLIC para poderem ser acessadas em qualquer momento da exec do codigo

		public nome: string;
		public idade: number;
		public nota: number;

		constructor(nome: string, idade: number, nota: number) {
			this.nome = nome;
			this.idade = idade;
			this.nota = nota;

		}
	}

	//arrayalunos criado para armazenar os dados da Classe aluno

	let arrayalunos = [];

	//Contador responsavel por ser o limite de input usado no bloco do While

	let i = 0;

	//Usado DO...While para armazenar os cadastros limitados a 3(Premissa do Desafio)
	do {


		let nome = String(await question("Digite o nome do Aluno: \n"));
		let idade = Number(await question("Digite a idade do Aluno: \n"));
		let nota = Number(await question("Digite a nota do Aluno: \n"));

		//constante cadaluno com a função de preencher as variaveis da Classe ALUNO

		const cadaluno = new aluno(nome, idade, nota)

		//Valores do arrayaluno serão alimentados pela constante CADALUNO que está diretamente atrelada a classe ALUNO

		arrayalunos[i] = cadaluno;

		//Contador responsavel por contar a quantidade de inputs COMPLETOS

		i++;

	}
	//While responsavel por manter o limite de inputs que a Classe Aluno vai receber

	while (i < 3);

	//Retorno do codigo usando o metodo sort com o complemento SORTBY para organizar os nomes em ordem alfabetica

	console.log(arrayalunos.sort(sortBy('nome')));

	//Constante responsavel por usar a extensão que capacita o codigo de transferir o retorno para excel
	const xl = require('excel4node');

	//Constante atrelada ao require da xl que cria uma nova função workbook, vai ser responsavel por criar o arquivo
	const wb = new xl.Workbook();

	//Constante responsavel por popular a planilha
	const ws = wb.addWorksheet('Alunos');

	//Constante criada para nomear as colunas da planilha

	const NomeColuna = [
		"Nome",
		"Idade",
		"Nota",
	]

	//Indica que o retorno vai começar na primeira linha

	let headingColumnIndex = 1;

	//Le cada item do array responsavel por nomear as colunas

	NomeColuna.forEach(heading => {

		//Cria uma célula do tipo string para cada título

		ws.cell(1, headingColumnIndex++).string(heading);

	});

	//Define que a primeira linha de preenchimento é a 2

	let rowIndex = 2;

	//Chamada do arrayalunos para trazer os dados indexados

	arrayalunos.forEach(record => {

		//Define o primeiro indexamento de valor na Coluna 1(Nome)

		let columnIndex = 1;

		/*Object.Entries responsavel por trazer os dados inputados pelo Usuario.
		Para cada coluna nomeada, ele vai trazer um dado respectivo, semelhante a organização do array.*/

		Object.entries(record).forEach(columnName => {

			/*Chama a const WS que é responsavel por popular a planilha, contador ++ na ColumnIndex para pular
			a coluna conforme os valores sao completados com base no array e os converte para string para
			poderem ser interpretados na planilha */

			ws.cell(rowIndex, columnIndex++).string(columnName[1].toString(), NomeColuna);

		});

		//Contador inserido na rowindex para pular para a proxima linha após preencher todas as colunas

		rowIndex++;

	});

	//Chama a const WB que cria o arquivo em excel.
	
	wb.write('ArquivoExcel.xlsx');

});

