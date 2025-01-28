#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');

program
  .version('1.0.0')
  .description('AniMax Framework CLI');

program
  .command('create <project-name>')
  .description('Yeni bir AniMax projesi oluştur')
  .action(async (projectName) => {
    const projectPath = path.join(process.cwd(), projectName);
    
    try {
      // Proje dizinini oluştur
      await fs.ensureDir(projectPath);
      
      // Temel dizin yapısını oluştur
      await fs.ensureDir(path.join(projectPath, 'src/pages'));
      await fs.ensureDir(path.join(projectPath, 'src/styles'));
      await fs.ensureDir(path.join(projectPath, 'public'));
      
      // Örnek dosyaları oluştur
      await fs.writeFile(
        path.join(projectPath, 'src/pages/index.max'),
        `@page {
  title: "Ana Sayfa"
}

@backend {
  const message = "Merhaba AniMax!";
}

<template>
  <div class="container">
    <h1>{message}</h1>
  </div>
</template>`
      );
      
      await fs.writeFile(
        path.join(projectPath, 'src/styles/main.maxt'),
        `@style container {
  layout: flex column;
  spacing: 20px;
  align: center;
  
  colors: {
    background: #f5f5f5;
    text: #333;
  }
}`
      );
      
      // package.json oluştur
      const packageJson = {
        name: projectName,
        version: '1.0.0',
        scripts: {
          dev: 'animax dev',
          build: 'animax build',
          start: 'animax start'
        },
        dependencies: {
          'animax-framework': '^1.0.0'
        }
      };
      
      await fs.writeFile(
        path.join(projectPath, 'package.json'),
        JSON.stringify(packageJson, null, 2)
      );
      
      console.log(chalk.green(`✨ ${projectName} projesi başarıyla oluşturuldu!`));
      console.log(chalk.blue(`\nBaşlamak için:`));
      console.log(chalk.white(`  cd ${projectName}`));
      console.log(chalk.white('  npm install'));
      console.log(chalk.white('  npm run dev'));
      
    } catch (error) {
      console.error(chalk.red('Hata:', error.message));
      process.exit(1);
    }
  });

program
  .command('dev')
  .description('Geliştirme sunucusunu başlat')
  .action(() => {
    require('../src/server').dev();
  });

program
  .command('build')
  .description('Projeyi derle')
  .action(() => {
    require('../src/builder').build();
  });

program
  .command('start')
  .description('Prodüksiyon sunucusunu başlat')
  .action(() => {
    require('../src/server').start();
  });

program.parse(process.argv); 