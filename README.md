# K8S-Example

Jenkins (deployed within a Kubernetes cluster using [Helm](https://github.com/kubernetes/helm)) is set up to watch this repo for changes then build and deploy all Pull Requests.

A comment is left on the Pull Request with a (local) link to the deployed application. Each Pull Request gets it's own namespace within the cluster.

Namespaces are cleaned up daily by a Jenkins cron job running the following:

```shell
kubectl get ns -l temp=true | grep '1d' | awk '{ print $1 }' | while read line; do echo "Deleting $line"; kubectl delete ns $line; done
```

This finds all namespaces that have the label `temp` set to `true` and have an age of `1d` (1 day) and deletes them.
