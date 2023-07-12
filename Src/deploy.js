const hre = require("hardhat");
async function main()
{
    // Получаю 0-ой аккаунт кошелька
    const signer = (await hre.ethers.getSigners())[0];

    // Вывожу адрес счёта и его баланс
    console.log("Signer: ", signer.address);
    console.log("Balance: ", (await signer.getBalance()));

    // Получаю их фабрики контрактов экземпляр 
    // моего контракта под названием "Transfers"
    const MyTest = (await hre.ethers.getContractFactory("Transfers", signer));
    // Деплою его, передавая ему значание 250 в качестве аргумента функции constract
    const myTest = (await MyTest.deploy(250));
    // Жду, пока подтвердится транзакция деплоя контракта
    await myTest.deployed();
    // Вывожу адрес контракта
    console.log("Contract Addr: ", myTest.address);
    // Вывожу значение, возвращаемое тестовой функцией смарт-контракта
    console.log('function Say18: ', await myTest.Say18() );

    // Ещё раз (чтобы показать, что списался Эфир за комаиссию)
    // Вывожу адрес счёта и его баланс
    console.log("Signer: ", signer.address);
    console.log("Balance: ", (await signer.getBalance()));    
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});