pipeline {
    agent any // usa l'agent di default (il container Jenkins)



    stages {
        stage('Checkout') {
            steps {
                // Clona il repo configurato nel job
                checkout scm
            }
        }

        stage('Info') {
            steps {
                echo "Workspace: ${pwd()}"
                // Mini pillola Groovy: prendo l'output di un comando e lo tratto come lista
                script {
                    def out = sh(script: "ls -1", returnStdout: true).trim()
                    def files = out ? out.split("\\n") : []
                    echo "File trovati (${files.size()}): ${files.join(', ')}"
                }
            }
        }

        stage('Package') {
            when {
                // Esempio utile per estensioni: pacchetta solo se c'è un manifest
                expression { fileExists('manifest.json') }
            }
            steps {
                echo "Creo pacchetto tar.gz dell'estensione"
                // escludo il file di output per evitare di auto-includerlo
                sh 'tar --exclude=estensione.tar.gz -czf estensione.tar.gz .'
            }
        }
    }

    post {
        success {
            echo "✅ Build #${env.BUILD_NUMBER} completata"
        }
        failure {
            echo "❌ Build fallita"
        }
    }
}
