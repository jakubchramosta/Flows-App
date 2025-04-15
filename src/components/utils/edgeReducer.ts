// This function is used to filter out edges based on certain conditions
export const edgeReducer = (edge: string, data: any) => {
  // Don't display edges marked as hidden
  if (data.hidden) {
    return { ...data, hidden: true, size: 0 };
  }
  return data;
};
