pipeline {
    agent any

    environment {
        // Variabile usata in più punti (GString => ${...})
        APP_NAME = 'estensioni-chrome'
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        

        stage('Prep (Groovy)') {
            steps {
                script {
                    // Funzione Groovy locale che riceve un nome in input
                    def slug = { String s -> s.toLowerCase().replaceAll('[^a-z0-9-]', '-') }
        
                    // fallback locale se env.APP_NAME è vuoto
                    def app = env.APP_NAME ?: 'estensioni-chrome'
        
                    // Ottengo lo short SHA dal repo
                    def gitSha = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
        
                    // Costruisco un nome pacchetto leggibile
                    env.PACKAGE_NAME = "${slug(app)}.${gitSha}.tar.gz"
                    echo "PACKAGE_NAME = ${env.PACKAGE_NAME}"
                }
            }
        }


        stage('Package') {
            when { expression { fileExists('manifest.json') } }
            steps {
                sh 'tar --exclude=${PACKAGE_NAME} -czf ${PACKAGE_NAME} .'
            }
        }

        stage('Check size') {
            when { expression { fileExists(env.PACKAGE_NAME ?: '') } }
            steps {
                sh 'ls -lh ${PACKAGE_NAME}'
            }
        }
    }

    post {
        always {
            echo "Build #${env.BUILD_NUMBER} finita su ${env.NODE_NAME}"
        }
    }
}
