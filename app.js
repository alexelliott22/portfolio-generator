const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template')

// const pageHTML = generatePage(name, github);


// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw err;

//     console.log('Portfolio Complete! Check out index.html to see the output!');
// })

const promptProject = portfolioData => {
    if(!portfolioData.projects) {
        portfolioData.projects = [];
    }

    console.log(`
    =================
    Add a New Project
    =================
    `)
    return inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of your project?',
          validate: projName => {
              if(projName) {
                  return true;
              }
              else{
                  console.log('Enter a project name!');
                  return false;
              }
          }
        },
        {
          type: 'input',
          name: 'description',
          message: 'Provide a description of the project (Required)',
          validate: projDesc => {
              if(projDesc) {
                  return true;
              }
              else{
                  console.log('Enter a Project Description!');
                  return false;
              }
          }
        },
        {
          type: 'checkbox',
          name: 'languages',
          message: 'What did you build this project with? (Check all that apply)',
          choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
          type: 'input',
          name: 'link',
          message: 'Enter the GitHub link to your project. (Required)',
          validate: link => {
              if(link) {
                  return true;
              }
              else{
                  console.log('Enter a link!');
                  return false;
              }
          }
        },
        {
          type: 'confirm',
          name: 'feature',
          message: 'Would you like to feature this project?',
          default: false
        },
        {
          type: 'confirm',
          name: 'confirmAddProject',
          message: 'Would you like to enter another project?',
          default: false
        }
      ])
      .then(projectData => {
        portfolioData.projects.push(projectData)
        if(projectData.confirmAddProject) {
            return promptProject(portfolioData);
        }
        else{
            return portfolioData;
        }
    });
}


const promptUser = () => {
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else{
                    console.log('Please Enter a name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                }
                else{
                    console.log('Please enter a Username');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            validate: informationProv => {
                if(informationProv) {
                    return true;
                }
                else{
                    console.log('Please enter some information!');
                    return false;
                }
            }
        }
    ]);
}

promptUser()
.then(promptProject)
.then(portfolioData => console.log(portfolioData))
