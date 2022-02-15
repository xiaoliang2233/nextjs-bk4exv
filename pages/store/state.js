function initialStore() {
  return {
    formData: {
      hasError: false,
    },
    serverData: {
      inferenceResult: null,
    },
    waiting: true,
  };
}

export default initialStore();
