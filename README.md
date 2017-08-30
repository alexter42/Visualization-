# Visualization
* Source Code from the blog post: [Interactive Data Visualization with D3.js, DC.js, Python, and MongoDB](http://adilmoujahid.com/posts/2015/01/interactive-data-visualization-d3-dc-python-mongodb/)


## Requirements

- Mongo (https://docs.mongodb.com/manual/installation/)

## Getting started

The dependencies for the project can be installed using

    $ pip install -r requirements.txt

To initialize the database you need to import the data.

    $ mongoimport -d DBS_NAME -c COLLECTION_NAME --type csv --file /path/to/file.csv -headerline
