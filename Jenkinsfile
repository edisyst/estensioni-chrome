pipeline {
    agent any  // Jenkins userà il nodo locale (nel tuo caso il container Jenkins)

    stages {
        stage('Checkout') {
            steps {
                // Clona il repo
                checkout scm
            }
        }

        stage('Lint') {
            steps {
                echo "Simulazione lint..."
                sh 'ls -la'  // mostra i file del progetto
            }
        }

        stage('Package') {
            steps {
                echo "Creo un pacchetto zip dell'estensione"
                sh 'zip -r estensione.zip .'
            }
        }
    }

    post {
        success {
            echo "Pipeline completata con successo!"
        }
        failure {
            echo "Qualcosa è andato storto 😅"
        }
    }
}
