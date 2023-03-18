export default function handler(req: any, res: any) {
  const data = {
    temperatura: 10,
    gas: 30,
    corrente: 20,
  };
  res.status(200).json(data);
}
