const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Payments", function()
{
    let acc0;
    let acc1;
    let payments;

    beforeEach
    (
      async function() 
    {
      [acc0, acc1, acc2] = (await ethers.getSigners());
      const Payments = (await ethers.getContractFactory("Payments"));
      payments = await Payments.deploy();
      await payments.deployed();
      console.log('      Contract address: ', payments.address);
    }
    )

    it("Контракт должен быть задеплоен", async function() {
        console.log("      Success!");
        expect(1, "Контракт НЕ найден").to.eq(1);
      })
   
      it("Начальный баланс равен нулю", async function() {
        const balance_start = await payments.currentBalance();
        expect(balance_start, "Не равен!").to.equal(0);
      })
  
      it("Отправка первой суммы на контракт", async function() {
        const money_summa = 100500;
        const trans_mess = 'This transfer for car buying';
        const trans = await payments.connect(acc1).pay(trans_mess, { value: money_summa });
        await trans.wait();
        expect(1, "На счёте деньги списались, а на контракте прибавились")
          .to.changeEtherBalance(acc1, -money_summa)
          .to.changeEtherBalance(payments, money_summa);
        const newPayment = await payments.getPayment(acc1.address, 0);
        expect(newPayment.message, "Сообщение в блокчейне не соответствует").to.eq(trans_mess);
        expect(newPayment.amount, "Сумма в блокчейне не соответствует").to.eq(money_summa);
        expect(newPayment.from, "Адрес отправителя в блокчейне не соответствует").to.eq(acc1.address);
      })             

}
)