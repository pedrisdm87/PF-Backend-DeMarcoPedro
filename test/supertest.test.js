import * as chai from 'chai'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'

const expect = chai.expect
const requester = supertest('http://localhost:8080') // simula cliente 

describe('Testing E-commerce', () => {
    describe('GET test all products', () => {
        it('The GET /api/products endpoint must register a new product', async () =>{
            const response = await requester.get("/api/products")
            expect (response.status).to.be.equal(200);
            })
        })

    describe('POST test that is responsible for creating a Cart', () => {
        it('The POST /api/carts endpoint should create a cart when a user registers', async () => {
            const result =  await requester.post("/api/carts")
            expect (result.status).to.be.eql(201)
        })
    })

    describe('Test session registration', () => {
        let cookie
        const testUser = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 18, max: 70 }),
            password: "secret",
        }
        it('The /api/session/register endpoint must register a new user', async () => {
            const response = await requester.post("/api/session/register").send(testUser)
            //console.log(response)
            expect(response.status).to.be.eql(302);
        })
        it('A user must log in and cookie must be returned', async () => {
            const result = await requester.post('/api/session/login').send({
                email: testUser.email,
                password: testUser.password
            })
            const cookieResult =  result.headers['set-cookie'][0]    //cookieResult = cookie_name=cookie_value
            expect(cookieResult).to.be.ok
            //console.log(cookieResult)
            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1],
            }
            //console.log(cookie)
            expect(cookie.name).to.be.ok.and.eql('connect.sid')
            expect(cookie.value).to.be.ok
        })
    })

     })

