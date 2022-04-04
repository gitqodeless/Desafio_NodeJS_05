/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

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
	
	class Aluno {
        nome:string = ''
        idade:number = 0
        nota:number = 0
    };
    const prompt = require('prompt-sync')({sigint: true});
    
    let alunos:Array<Aluno> = [];
    var A: number = 0;
    A = prompt("Qual a quantidade de alunos?")

    for (let i = 1; i <= A; i++) {
        const nome = prompt('Qual o seu nome?');
        console.log(`Olá ` + nome);
        const idade = prompt("qual sua idade? ");
        const nota = prompt("qual sua nota? ");
    
        alunos.push({nome,
                idade,
                nota,
        });  
         
    var notas = alunos.reduce((a, b) => a + b.nota, 0);
    console.log(notas)

    }
	const ObjectsToCsv = require('objects-to-csv');

	const csv = new ObjectsToCsv(alunos);

	await csv.toDisk('./list.csv', { append: true });
});
