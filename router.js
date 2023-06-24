// map routes here
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const socialLoginRouter = require('./routes/socialLogin')
const projectRouter = require('./routes/project')
const educationRouter = require('./routes/education')

module.exports = function (app) {
	app.use('/api/v1', userRouter)
	app.use('/api/v1', authRouter)
	app.use('/api/v1', socialLoginRouter)
	app.use('/api/v1', projectRouter)
	app.use('/api/v1', educationRouter)
}