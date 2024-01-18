const { Client } = require('@elastic/elasticsearch');

const cloudId = 'your_cloud_id'; // Only required if using a hosted Elasticsearch service like Elasticsearch Service on Elastic Cloud

// Instantiate Elasticsearch client
const node =  process.env.elastic_node;
const username = process.env.elastic_username;
const password = process.env.elastic_password;

var client;
exports.elastic_connection = async () => {
  client = new Client({
    node: node,
    auth: {
      username: username,
      password: password
    }
  });
}


// Example usage
// async function searchDocuments() {
//   try {
//     const { body } = await client.search({
//       index: 'your_index_name',
//       body: {
//         query: {
//           match: { 
//             field: 'value' // Replace 'field' with an actual field in your documents, and 'value' with the desired value to match
//           }
//         },
//       },
//     });

//     console.log(body.hits.hits);
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Call the example function
// searchDocuments();

//create index
exports.create_index = async (indexname, structure) => {
  console.log("client", client, "client");
  try {
    const body = await client.indices.create({ index: indexname, body: structure });

    console.log(`Index '${indexname}' created:`, body);
    return body;
  } catch (error) {
    console.error(error);
  }
}

//Insert Docmuent
exports.insert_document = async (indexname, document) => {
  try {
    const body = [];
    /**
     * Insert Single Document
     * 
     */
    const response = await client.index({  
      index: indexname,
      id:"4lw6c4kbh5e9n9dznbvs",
      body:document
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}
//Get all document
exports.getAllDocuments = async (index_name) => {
  try {
    const pageSize = 5; 
    const currentPage = 1;
    console.log(index_name);
    const body = await client.search({
      index: index_name,
      from: (currentPage - 1) * pageSize, // Calculate the starting index based on the current page
      size: pageSize,
      body: {
        query: {
          match_all: {}, // Match all documents
        },
      },
    });

    const documents = body.hits.hits.map((hit) => hit._source);
    return documents;
    console.log(documents);

  } catch (error) {
    console.error(error);
  }
}

// Example function to delete a document
exports.deleteDocument = async (indexName, documentId) => {
  try {
    // const body  = await client.deleteByQuery({ //Delete bulk document
    //   index: indexName,
    //   body: {
    //     query: {
    //       match: {
    //         field: 'value' // Replace 'field' with an actual field in your documents, and 'value' with the desired value to match
    //       }
    //     }
    //   }
    // });
    const body = await client.delete({
      index: indexName,
      id: documentId,
    });
    console.log(`Document with id ${documentId} deleted from index ${indexName}`);
    return body;
  } catch (error) {
    console.error(error);
  }
}


// Example function to update a document
exports.updateDocument = async () => {
  try {
    const documentId = '4lw6c4kbh5e9n9dznbvs'; // Replace with the ID of the document you want to update
    const body = await client.update({
      index: indexName,
      id: documentId,
      body: {
        doc: {
          "field1": 'Student Details',
          "field2":"field2"
        },
      },
    });

    console.log(`Document updated: ${body.result}`);
    return body;
  } catch (error) {
    console.error(error);
  }
}
// Example function to search for documents
exports.searchDocuments = async (indexname, prefix) => {
  try {
    /****
     *  Search Document With Type full field vale
     */
    // const searchQuery = {
    //   query: {
    //     match: {
    //       title: 'Student Details' // Replace 'field' with an actual field in your documents, and 'value' with the desired value to match
    //     }
    //   }
    // };
    // const body  = await client.search({
    //   index: indexName,
    //   body: searchQuery,
    // });
    // console.log(body.hits.hits);
    // return body.hits.hits;

    /****
     * auto complete Search
     * 
     */
    // Autocomplete search
    const suggestions = await autocompleteSearch(indexname, prefix);
    console.log(`Autocomplete suggestions for '${prefix}':`, suggestions)
    return suggestions;

  } catch (error) {
    console.error(error);
  }
}


const insertDocumentWithSuggestion = async (indexname, document) => {
  return await client.index({
    index: indexname,
    body: {
      suggest: {
        input: document.name, // Input for autocomplete suggestions
        weight: 10, // Adjust the weight according to relevance
      },
      class: document.class
    },
  });
};

//AutoComplete Search
const autocompleteSearch = async (indexname, prefix) => {
  const body = await client.search({
    index: indexname,
    body: {
      suggest: {
        suggestions: {
          prefix,
          completion: {
            field: 'name',
            skip_duplicates: true,
          },
        },
      },
    },
  });

  return body.suggest.suggestions[0].options.map((option) => option.text);
};

//Delete Index
exports.delete_index = async (index_name) => {
  await client.indices.delete({
    index: index_name,
  }).then(function (resp) {
    console.log("Successful query!");
    return JSON.stringify(resp, null, 4);
  }, function (err) {
    console.trace(err.message);
  });
}

//AutoComplete Search
exports.autoCompleteSearch = async (indexname, text) => {
  const resp = await client.search({
    index: indexname,
    from: (currentPage - 1) * 5, // Calculate the starting index based on the current page
    size: 5,
    body: {
      query: {
        "bool": {
          "must": [
            { "match": { "object.ref": "64634c25d5f69f0c28fc60b9" } },
            {
              "nested": {
                "path": "data",
                "query": {
                  "bool": {
                    "must": [
                      {
                        "match": {
                          "data.data": text,
                        }
                      }
                    ]
                  }
                }
              }
            }
          ]
        }
      }
    }
  });
  return resp.hits.hits;
}

//AutoComplete Search
exports.DjangoautoCompleteSearch = async (indexname, text) => {
  console.log(text)
  const resp = await client.search({
    index: indexname,
    from: 0, // Calculate the starting index based on the current page
    size: 5,
    body:{
      "query": {
          "bool": 
              {
                  "should": [
                    {
                      "match": {
                        "deatils": text,
                      }
                    },
                    {
                      "match": {
                        "description": text,
                      }
                    },
                    {
                      "match": {
                        "title": text,
                      }
                    },
                    // {
                    //   "match": {
                    //     "bio": text,
                    //   }
                    // }
                  ]
              }
          },

      }    
  });
  return resp.hits.hits;
}

exports.update_index = async(index,body)=>{
  try {
    // Update the mapping properties of the index
    const updateResponse  = await client.indices.putMapping({
      index: index,
      body: body
    });

    console.log(`Mapping properties updated for index ${index}.`);
    console.log(updateResponse);
    return updateResponse
  } catch (error) {
    console.error('Error:', error);
  }
}