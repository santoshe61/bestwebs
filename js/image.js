export function resize(file, config) {
	config = { maxWidth: 1000, maxHeight: 1000, quality: 0.8, ...config }
	return new Promise((resolve, reject) => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		let img = new Image();
		img.onload = async function () {
			//   canvas.drawImage(img, 0, 0, 320, 240);
			//   let base64Image = canvas.toDataURL("image/png");

			// native alternetive way (don't take care of exif rotation)
			// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap
			// const img = await createImageBitmap(file)

			// calculate new size
			const ratio = Math.min(
				config.maxWidth / img.width,
				config.maxHeight / img.height,
				1
			);
			const width = (img.width * ratio) | 0;
			const height = (img.height * ratio) | 0;

			// resize the canvas to the new dimensions
			canvas.width = width;
			canvas.height = height;
			canvas.dataset.name = file.name;

			// scale & draw the image onto the canvas
			ctx.drawImage(img, 0, 0, width, height);
			if (config.text) {
				if (typeof config.text === 'string') {
					ctx.font = "30px Arial";
					ctx.fillText(config.text, 10, 10);
				} else if (typeof config.text === 'function') {
					config.text.apply(ctx, ctx);
				} else {
					ctx.font = config.text.font;
					ctx.fillText(config.text.text, 10, 10);
				}
			}

			// just to preview
			//   document.body.appendChild(canvas);

			// Get the binary (aka blob)
			const blob = await new Promise((rs) => canvas.toBlob(rs, file.type, config.quality));
			resolve({ canvas, blob, file: new File([blob], file.name, file) });
		};
		img.onerror = reject;
		img.src = URL.createObjectURL(file);
	});
}

export default { resize }