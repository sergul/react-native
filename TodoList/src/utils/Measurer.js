const measureComponent = (compRef) => {
  return new Promise((resolve, reject) => {
    try {
      compRef.measureInWindow((x, y, width, height, globalX, globalY) => {
        resolve({ x, y, width, height });
      });
    } catch (error) {
      reject(new Error(error));
    }
  });
};

export default measureComponent;
