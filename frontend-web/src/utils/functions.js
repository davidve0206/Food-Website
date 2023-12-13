/* Function to extract a list which cointains objects with keys "id" and "username"

The function is used to extract usernames from a particular field  (fieldName) from the
array of objects returned by  an API call */
export function get_ids_and_usernames(objectArray, fieldName) {
  let output = []
  for (const listItem of objectArray) {
    let id_field_pair = {id: listItem["id"], username: listItem[fieldName]}
    output.push(id_field_pair)
  }
  return output
}

/* Function to extract an array which cointains only the values of a specific field (fieldName) from
each object in an array of objects (objectArray) returned from an API call */
export function get_usernames(objectArray, fieldName) {
  let output = []
  for (const listItem of objectArray) {
    output.push(listItem[fieldName])
  }
  return output
}