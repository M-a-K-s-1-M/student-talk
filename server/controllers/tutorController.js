const bcrypt = require('bcrypt');
const { Tutor } = require('../models/models');
const jwt = require('jsonwebtoken');

const generateJWT = (id, firstname, lastname, patronymic, email, group) => {
    return jwt.sign({ id, firstname, lastname, patronymic, email, group }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class TutorController {
    async registration(req, res) {
        const { firstname, lastname, patronymic, email, password, role } = req.body;
        if (!email || !password) {
            return res.json({ message: 'Некорректный email или пароль' })
        }

        const candidate = await Tutor.findOne({ where: { email } })
        if (candidate) {
            return res.json({ message: 'Пользоваетль с таким email уже существует' })
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const tutor = await Tutor.create({ firstname, lastname, patronymic, email, password: hashPassword, role })
        //Дописать зависимые id, пример:  const basket = await Basket.create({ userId: user.id })

        const token = generateJWT(tutor.id, tutor.firstname, tutor.lastname, tutor.patronymic, tutor.email, tutor.role);
        return res.json({ token })

    }

    async login(req, res) {
        const { email, password } = req.body;
        const tutor = await Tutor.findOne({ where: { email } });


        if (!tutor) {
            return res.json({ message: 'Пользователь не найден' })
        }

        let comparePassword = bcrypt.compareSync(password, tutor.password);
        if (!comparePassword) {
            return res.json({ message: 'Указан неверный пароль' })
        }

        const token = generateJWT(tutor.id, tutor.firstname, tutor.lastname, tutor.patronymic, tutor.email, tutor.role);
        return res.json({ token })
    }

}


module.exports = new TutorController();