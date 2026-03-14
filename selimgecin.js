#!/usr/bin/env node
'use strict';
import {got} from 'got';
import chalk from 'chalk';
import ww from 'word-wrap';
import search from '@inquirer/search';
import opn from 'open';
import img from 'terminal-image';

const sections = {
  experience: `
    ${chalk.bold("💼 Experience")}

    ${chalk.green.bold("Full Stack Developer")} @ ${chalk.bold("Connect-ION Tech.")}  ${chalk.gray("02/2024 – Current")}
      Angular apps controlling 1000+ IoT devices via MQTT broker. Projects: Connect360, SecurWatt, ForestEye.

    ${chalk.green.bold("Full Stack Developer")} @ ${chalk.bold("CZ London")}  ${chalk.gray("10/2022 – 02/2024")}
      Scalable APIs with NodeJS, CI/CD, load testing. Led CloudFrame (AWS CDN) and CZ Pay (virtual POS).

    ${chalk.green.bold("Full Stack Developer")} @ ${chalk.bold("Arasta ITC")}  ${chalk.gray("04/2022 – 10/2022")}
      MongoDB, NodeJS, React, NextJS. E-commerce platform & internal Jira-like task management app.
  `,
  stack: `
    ${chalk.bold("🛠  Tech Stack")}

    ${chalk.cyan.bold("Languages:")}   TypeScript, JavaScript
    ${chalk.cyan.bold("Backend:")}     NodeJS, Express, Fastify, NestJS
    ${chalk.cyan.bold("Frontend:")}    React, NextJS, Angular
    ${chalk.cyan.bold("Databases:")}   MongoDB, Redis
    ${chalk.cyan.bold("DevOps:")}      Docker, AWS, CI/CD
    ${chalk.cyan.bold("Tests:")}       Jest, Cypress, E2E, Unit Test
    ${chalk.cyan.bold("Paradigms:")}   OOP, TDD, SOLID, Type Safety
  `,
  projects: `
    ${chalk.bold("🚀 Projects")}

    ${chalk.yellow.bold("Connect360")}              Vehicle tracking system for logistics companies.
    ${chalk.yellow.bold("SecurWatt")}               IoT amperage monitor & power surge protection.
    ${chalk.yellow.bold("ForestEye")}               Forest fire response system with IoT pool monitoring.
    ${chalk.yellow.bold("Global Sync")}             Multi-marketplace product & stock management.
    ${chalk.yellow.bold("ExpressFlow")}             API management with load balancer configuration.
    ${chalk.yellow.bold("CZ Pay")}                  3D secure virtual POS integration with Vakıfbank.
    ${chalk.yellow.bold("Elite DJ Academy")}        Music production and DJ academy with NextJS.
    ${chalk.yellow.bold("Ankara DJ Party")}         Ankara's largest DJ event and organization website, built with NextJS.
`,
};

const help = `
  ${chalk.bold('📖 Available commands:')}

  ${chalk.cyan('help')}           Interactive menu
  ${chalk.cyan('experience')}     Work history
  ${chalk.cyan('stack')}          Tech stack
  ${chalk.cyan('projects')}       Projects
  ${chalk.cyan('help')}           Show this help
  ${chalk.red('github')}          Open GitHub profile
  ${chalk.red('gitlab')}          Open GitLab profile
  ${chalk.blue('linkedin')}       Open LinkedIn profile
  ${chalk.red('exit')}            Exit the program
`;

const arg = process.argv[2];

if (arg === 'help')       { console.log(help); process.exit(); }
if (arg === 'experience') { console.log(sections.experience); process.exit(); }
if (arg === 'stack')      { console.log(sections.stack); process.exit(); }
if (arg === 'projects')   { console.log(sections.projects); process.exit(); }

got('https://avatars.githubusercontent.com/hopesf', { responseType: 'buffer' })
.then( image => img.buffer(image.body, { width: '30%', preferNativeRender: true }))
.then( image => {
  console.log(image)
  console.log('\n' + ww(`
👋 Hi, I'm ${chalk.blue.bold("Selim GEÇİN")} — Full Stack Developer based in ${chalk.bold("Ankara, Turkey")}.

${chalk.bold("📋 Summary")}
5 years of experience in both front-end and back-end technologies.\nSpecialized in ${chalk.yellow.bold("REST API")}, ${chalk.yellow.bold("IoT")}, ${chalk.yellow.bold("Microservices")}, ${chalk.yellow.bold("E-commerce")} and ${chalk.yellow.bold("virtual POS")} systems.'\n'Strong emphasis on type safety, clean code and scalable architecture.

📫 ${chalk.red.bold('gecin18@gmail.com')}
  `.trim(), { width: 200, trim: true }));

  console.log('\n' + chalk.dim('  Ask me anything! Use the menu below to learn more.'));
  console.log(chalk.dim('  Tip: write ' + chalk.italic('help') + ' to see all available commands.\n'));

  const choices = [
    { name: `💼  Work experience`,                                                 value: 'experience' },
    { name: `🛠   Tech stack`,                                                     value: 'stack' },
    { name: `🚀  Projects`,                                                        value: 'projects' },
    { name: chalk.gray(`💻  Open source work  (${chalk.bold('GitHub')})`),        value: 'github' },
    { name: chalk.red(`🦊  GitLab profile  (${chalk.bold('GitLab')})`),           value: 'gitlab' },
    { name: chalk.blue(`🏹  Full CV  (${chalk.bold('LinkedIn')})`),               value: 'linkedin' },
    { name: chalk.dim(`📖  Help  (all commands)`),                                 value: 'help' },
    { name: chalk.red(`👋  That's enough, bye!`),                                  value: 'exit' },
  ];

  const ask = async () => {
    try {
      const topic = await search({
        message: 'What do you want to know? (type to filter)',
        source(input) {
          if (!input) return choices;
          const q = input.toLowerCase();
          return choices.filter(c => {
            const plain = c.value + ' ' + c.name.replace(/\x1b\[[\d;]*m/g, '');
            return plain.toLowerCase().includes(q);
          });
        },
      });
      if (topic === 'exit')     { console.log(chalk.dim('\nBye! 👋\n')); process.exit(); }
      if (topic === 'github')   { opn('https://github.com/hopesf');          return ask(); }
      if (topic === 'gitlab')   { opn('https://gitlab.com/selimgecin');       return ask(); }
      if (topic === 'linkedin') { opn('https://linkedin.com/in/selim-gecin'); return ask(); }
      if (topic === 'help')     { console.log(help);                          return ask(); }
      if (sections[topic])      { console.log(sections[topic]); }
      return ask();
    } catch {}
  };

  ask();
}).catch(e => console.log(e));

