import { NextApiRequest, NextApiResponse } from "next"

export default (req: NextApiRequest, res: NextApiResponse) => {
  if(req.query.data === 'holi'){
    return res.status(200).json({ message: 'si funciono, asi se habla con el servidor', to: req.query.to })
  }
  res.status(200).json({ message: 'Que onda', to: 'Shinesito' })
}