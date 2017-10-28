const api = {

  /**
   * Updates a OSM node.
   *
   * @param {int} nodeID
   * @param {object} data - The new OSM node data
   * @return {Promise} The update action.
   */
  updateNode: ({nodeID, data}) => {
    const updateRequest = new Request(`https://www.openstreetmap.org/api/0.6/node/${nodeID}`, {
        method: 'PUT',
        body: data
      }
    )

    return fetch(updateRequest)
  },

  /**
   * Get a OSM node.
   *
   * @param {int} nodeID
   * @return {Promise} The action.
   */
  getNode: ({nodeID}) => {
    const getRequest = new Request(`https://www.openstreetmap.org/api/0.6/node/${nodeID}`, {
      method: 'GET'
    })

    return fetch(getRequest)
      .then((response) => {
        return response.text()
      })
  }
}

export default api