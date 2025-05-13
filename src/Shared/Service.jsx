const FormatResult = (resp) => {
  const resultMap = new Map();

  resp.forEach((item) => {
    const car = item.carListing;
    const image = item.carImages;

    if (!car) return;

    if (!resultMap.has(car.id)) {
      resultMap.set(car.id, {
        ...car,         // Spread all car listing fields here
        images: [],
      });
    }

    if (image) {
      resultMap.get(car.id).images.push(image);
    }
  });

  return Array.from(resultMap.values());
};

export default {
  FormatResult,
};
