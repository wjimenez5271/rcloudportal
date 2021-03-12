.DEFAULT_GOAL := start


start:
	DEBUG=myapp:* npm start

build:
	docker build -t wjimenez5271/rancher-cloud-portal .

push:         
	docker push wjimenez5271/rancher-cloud-portal

