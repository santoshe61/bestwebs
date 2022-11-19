export default async function sleep(time) {
	return await new Promise((res) => setTimeout(res, time*1000));
}