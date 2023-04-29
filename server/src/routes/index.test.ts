import assert from 'assert'
import sinon from 'sinon'
import UserController from '../controller/UserController'
import User from '../database/schemas/User'


describe('UserController', () => {
  describe('GET: /health', () => {
    let sandbox: sinon.SinonSandbox
    beforeEach(() => {
      sandbox = sinon.createSandbox()
      sandbox.stub(UserController, 'healthCheck').resolves({
        message: "Health check ok"
      } as any)
    })
    afterEach(() => {
      sandbox.restore()
    })
    it('Should return ok when the API is turn on', async () => {
      const response = await UserController.healthCheck({} as any, {} as any)
      assert.deepStrictEqual(response, {
        message: "Health check ok"
      })
    })
  })
  describe('POST: /register', () => {
    let sandbox: sinon.SinonSandbox
    afterEach(() => {
      sandbox.restore()
    })
    describe('When the body has not the name, username or password', () => {
      beforeEach(() => {
        sandbox = sinon.createSandbox()
        sandbox.stub(UserController, 'create').resolves({
          message: "Name, username or password is missing"
        } as any)
      })
      it('Should return invalid params', async () => {
        const request = {
          body: {
            username: "test",
            password: "test"
          }
        }
        const response = await UserController.create(request as any, {} as any)
        assert.deepStrictEqual(response, {
          message: "Name, username or password is missing"
        })
      })

    })

    describe('When the user is already exist', () => {
      beforeEach(() => {
        sandbox = sinon.createSandbox()
        sandbox.stub(User, 'findOne').resolves({
          message: "User already exists"
        })
      })
      it('Should return bad request', async () => {
        const userExist = await User.findOne({
          username: "test"
        })
        assert.deepStrictEqual(userExist, {
          message: "User already exists"
        })
      })
    })
    describe('When the user is not exist', () => {
      const userMock = {
        name: "test",
        username: "test",
        password: "test"
      }
      beforeEach(() => {
        sandbox = sinon.createSandbox()
        sandbox.stub(User, 'findOne').resolves(null)
        sandbox.stub(User, 'create').resolves({
          message: "User created successfully",
          userMock
        } as any)
      })
      it('Should return ok', async () => {
        const userExist = await User.findOne({
          username: "test"
        })
        assert.deepStrictEqual(userExist, null)
        const user = await User.create(userMock)
        assert.deepStrictEqual(user, {
          message: "User created successfully",
          userMock
        })
      })
    }
    )
  })
  describe('GET: /users', () => {
    const moreThanOneUser = [
      {
        name: "test",
        username: "test",
        password: "test"
      },
      {
        name: "test2",
        username: "test2",
        password: "test2"
      }
    ]
    let sandbox: sinon.SinonSandbox
    afterEach(() => {
      sandbox.restore()
    }
    )
    describe('When the token is correct', () => {
      beforeEach(() => {
        sandbox = sinon.createSandbox()
        sandbox.stub(UserController, 'findAll').resolves(moreThanOneUser as any)
      })
      it('Should return all users', async () => {
        const response = await UserController.findAll({} as any, {} as any)
        assert.deepStrictEqual(response, moreThanOneUser)
      })
    })
    describe('When the token is incorrect', () => {
      beforeEach(() => {
        sandbox = sinon.createSandbox()
        sandbox.stub(UserController, 'findAll').resolves({
          message: "Invalid token"
        } as any)
      })
      it('Should return invalid token', async () => {
        const response = await UserController.findAll({} as any, {} as any)
        assert.deepStrictEqual(response, {
          message: "Invalid token"
        })
      })
    })
  })
})
