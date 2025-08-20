pipeline {
    agent any

    parameters {
        string(name: 'APP_NAME', defaultValue: 'estensioni-chrome', description: 'Nome del pacchetto')
        booleanParam(name: 'DO_PACKAGE', defaultValue: true, description: 'Creare il pacchetto?')
    }

    stages {
        stage('Quality Checks') {
            parallel {
                stage('Lint') {
                    steps {
                        sh 'echo "Simulazione lint"'
                    }
                }
                stage('Unit Tests') {
                    steps {
                        sh 'echo "Simulazione test unitari"'
                    }
                }
                stage('Security Scan') {
                    steps {
                        sh 'echo "Simulazione scan sicurezza"'
                    }
                }
            }
        }
        
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Custom Logic') {
            steps {
                script {
                    def slugify = { str -> str.toLowerCase().replaceAll('[^a-z0-9-]', '-') }
                    echo "Slug di APP_NAME = ${slugify(params.APP_NAME)}"
                }
            }
        }

        stage('Package') {
            when {
                expression { return params.DO_PACKAGE }
            }
            steps {
                script {
                    def gitSha = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    env.PACKAGE_NAME = "${params.APP_NAME}.${gitSha}.tar.gz"
                    sh "tar --exclude=${env.PACKAGE_NAME} -czf ${env.PACKAGE_NAME} ."
                }
            }
        }

        stage('Archive') {
            when { expression { fileExists(env.PACKAGE_NAME ?: '') } }
            steps {
                archiveArtifacts artifacts: "${env.PACKAGE_NAME}"
            }
        }
    }
}
