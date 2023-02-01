import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { validUser, invalidUser } from "./mock/User.mock";

import { app } from "../app";
import usersModel from "../database/models/User.model";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testes login", () => {


    it("01. É possível realizar o login com sucesso.", async () => {
      
        sinon
        .stub(usersModel, "findOne")
        .resolves({ dataValues: validUser } as any);
  
    const result = await chai
      .request(app)
      .post("/login")
      .send({ email: validUser.email, password: "secret_admin" });
    expect(result.status).to.be.equal(200);
    expect(result.body).to.have.property("token");
  });

  it("02. Verifica se o email foi informado", async () => {
    const result = await chai
      .request(app)
      .post("/login")
      .send({ password: invalidUser.password });
    expect(result.status).to.be.equal(400);
    expect(result.body).to.be.deep.equal({
      message: "All fields must be filled",
    });
  });

  it("03. Verifica se a senha foi informada", async () => {
    const result = await chai
      .request(app)
      .post("/login")
      .send({ email: validUser.email });
    expect(result.status).to.be.equal(400);
    expect(result.body).to.be.deep.equal({
      message: "All fields must be filled",
    });
  });

  it("04. Verifica se os dados são validos", async () => {
    const result = await chai
      .request(app)
      .post("/login")
      .send({ email: invalidUser.email, password: invalidUser.password });
    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal({
      message: "Incorrect email or password",
    });
  });

  it("05. Verifica retorna erro com formato de email invalido", async () => {
    const result = await chai
      .request(app)
      .post("/login")
      .send({ email: "astrowest", password: invalidUser.password });
    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal({
      message: "Incorrect email or password",
    });
  });

  it("06. não realiza login com a senha incorreta", async () => {
    const result = await chai
      .request(app)
      .post("/login")
      .send({ email: validUser.email, password: 'teste' });
    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.a('object');
    expect(result.body).to.be.deep.equal({
      message: "Incorrect email or password",
    });
  });

  it('07. retorna "Token not found" se o token for incorreto', async () => {
    const result = await chai.request(app).get("/login/validate");
    expect(result.status).to.be.equal(400);
    expect(result.body.message).to.have.equal("Token not found");
  });
});
