import Colors from './Colors';
import { iOSColors } from 'react-native-typography';

const colors = [Colors.iconBackgroundColor, '#E04F5E', '#035FD2', '#00EFD1', '#EFC84A', '#27A2DB', '#4E5565'];
let icons = {
    '001star': {
        image: require('../assets/images/icons/001-star.png'),
        color: iOSColors.customGray
    },
    // '003coins1': {
    //     image: require('../assets/images/icons/003-coins-1.png'),
    //     color: iOSColors.pink
    // },
    '015cash': {
        image: require('../assets/images/icons/015-cash.png'),
        color: iOSColors.customGray
    },
    '005visa': {
        image: require('../assets/images/icons/005-visa.png'),
        color: iOSColors.yellow
    },
    '006mastercard1': {
        image: require('../assets/images/icons/006-mastercard-1.png'),
        color: '#3C80AD',
    },
    '083discover': {
        image: require('../assets/images/icons/083-discover.png'),
        color: '#F4F0FE'
    },
    '007paypal': {
        image: require('../assets/images/icons/007-paypal.png'),
        color: '#035FD2',
    },
    '008gear': {
        image: require('../assets/images/icons/008-gear.png'),
        color: '#4E5565'
    },
    '009wallet': {
        image: require('../assets/images/icons/009-wallet.png'),
        color: iOSColors.tealBlue
    },
    '010businessandfinance1': {
        image: require('../assets/images/icons/010-business-and-finance-1.png'),
        color: '#EFC84A'
    },
    '011save': {
        image: require('../assets/images/icons/011-save.png'),
        color: iOSColors.tealBlue
    },
    '012bank': {
        image: require('../assets/images/icons/012-bank.png'),
        color: '#EFC84A'
    },
    '013businessandfinance2': {
        image: require('../assets/images/icons/013-business-and-finance-2.png'),
        color: iOSColors.tealBlue
    },
    '014award1': {
        image: require('../assets/images/icons/014-award-1.png'),
        color: iOSColors.customGray
    },
    '016money': {
        image: require('../assets/images/icons/016-money.png'),
        color: iOSColors.purple
    },
    '017businessandfinance3': {
        image: require('../assets/images/icons/017-business-and-finance-3.png'),
        color: '#4E5565'
    },
    '018payment2': {
        image: require('../assets/images/icons/018-payment-2.png'),
        color: '#4E5565',
        // fullSize: true
    },
    '019atm': {
        image: require('../assets/images/icons/019-atm.png'),
        color: Colors.iconBackgroundColor
    },
    '020insurance': {
        image: require('../assets/images/icons/020-insurance.png'),
        color: iOSColors.yellow
    },
    // '021money1': {
    //     image: require('../assets/images/icons/021-money-1.png'),
    //     color: Colors.iconBgBlue
    // },
    // '022gold': {
    //     image: require('../assets/images/icons/022-gold.png'),
    //     color: '#F4F0FE'
    // },
    '023businessandfinance': {
        image: require('../assets/images/icons/023-business-and-finance.png'),
        color: '#F4F0FE'
    },
    '024coin': {
        image: require('../assets/images/icons/024-coin.png'),
        color: '#035FD2'
    },
    '025pay': {
        image: require('../assets/images/icons/025-pay.png'),
        color: iOSColors.blue
    },
    '026mortgage': {
        image: require('../assets/images/icons/026-mortgage.png'),
        color: '#F4F0FE'
    },
    '027percentage1': {
        image: require('../assets/images/icons/027-percentage-1.png'),
        color: '#F4F0FE'
    },
    '028pricetag': {
        image: require('../assets/images/icons/028-price-tag.png'),
        color: Colors.iconBgYellow
    },
    '029idea': {
        image: require('../assets/images/icons/029-idea.png'),
        color: '#F4F0FE'
    },
    '030heart1': {
        image: require('../assets/images/icons/030-heart-1.png'),
        color: iOSColors.red
    },
    '031hands': {
        image: require('../assets/images/icons/031-hands.png'),
        color: '#E04F5E'
    },
    '032gift': {
        image: require('../assets/images/icons/032-gift.png'),
        color: '#00EFD1'
    },
    '033gift1': {
        image: require('../assets/images/icons/033-gift-1.png'),
        color: '#4E5565'
    },
    '034heart': {
        image: require('../assets/images/icons/034-heart.png'),
        color: iOSColors.purple
    },
    '035buy': {
        image: require('../assets/images/icons/035-buy.png'),
        color: '#E04F5E'
    },
    '036bank1': {
        image: require('../assets/images/icons/036-bank-1.png'),
        color: Colors.iconBgYellow
    },
    '037gamecontroller': {
        image: require('../assets/images/icons/037-game-controller.png'),
        color: Colors.iconBgCyan
    },
    '038foodandrestaurant': {
        image: require('../assets/images/icons/038-food-and-restaurant.png'),
        color: Colors.iconBackgroundColor
    },
    '039ticket': {
        image: require('../assets/images/icons/039-ticket.png'),
        color: iOSColors.blue
    },
    '040dinner': {
        image: require('../assets/images/icons/040-dinner.png'),
        color: iOSColors.customGray
    },
    '041gas': {
        image: require('../assets/images/icons/041-gas.png'),
        color: '#00EFD1'
    },
    '042hotairballoon': {
        image: require('../assets/images/icons/042-hot-air-balloon.png'),
        color: iOSColors.tealBlue
    },
    '043loan': {
        image: require('../assets/images/icons/043-loan.png'),
        color: iOSColors.pink
    },
    '044invest': {
        image: require('../assets/images/icons/044-invest.png'),
        color: Colors.iconBgCyan
    },
    '045receipt': {
        image: require('../assets/images/icons/045-receipt.png'),
        color: iOSColors.tealBlue
        // fullSize: true
    },
    '046transfer': {
        image: require('../assets/images/icons/046-transfer.png'),
        color: '#EFC84A'
    },
    '047boardingpass': {
        image: require('../assets/images/icons/047-boarding-pass.png'),
        color: Colors.iconBgCyan
    },
    '048tax': {
        image: require('../assets/images/icons/048-tax.png'),
        // fullSize: true,
        color: Colors.iconBgYellow
    },
    '049report': {
        image: require('../assets/images/icons/049-report.png'),
        color: '#F4F0FE'
    },
    '050law': {
        image: require('../assets/images/icons/050-law.png'),
        color: Colors.iconBgCyan
    },
    '051box': {
        image: require('../assets/images/icons/051-box.png'),
        color: '#27A2DB'
    },
    '052payment': {
        image: require('../assets/images/icons/052-payment.png'),
        color: '#035FD2'
    },
    '053cost': {
        image: require('../assets/images/icons/053-cost.png'),
        color: '#00EFD1'
    },
    '054discount': {
        image: require('../assets/images/icons/054-discount.png'),
        color: '#00EFD1',
        // fullSize: true
    },
    '055euro': {
        image: require('../assets/images/icons/055-euro.png'),
        color: Colors.iconBackgroundColor
    },
    '056exchange': {
        image: require('../assets/images/icons/056-exchange.png'),
        color: Colors.iconBackgroundColor
    },
    '057store': {
        image: require('../assets/images/icons/057-store.png'),
        color: Colors.iconBackgroundColor
    },
    '058house': {
        image: require('../assets/images/icons/058-house.png'),
        color: '#EFC84A'
    },
    // '059padlock': {
    //     image: require('../assets/images/icons/059-padlock.png'),
    //     color: '#00EFD1'
    // },
    // '060bank2': {
    //     image: require('../assets/images/icons/060-bank-2.png'),
    //     color: Colors.iconBgCyan
    // },
    '061bitcoin': {
        image: require('../assets/images/icons/061-bitcoin.png'),
        color: Colors.iconBackgroundColor
    },
    // '062realestate': {
    //     image: require('../assets/images/icons/062-real-estate.png'),
    //     color: '#00EFD1'
    // },
    // '063bank3': {
    //     image: require('../assets/images/icons/063-bank-3.png'),
    //     color: '#27A2DB'
    // },
    '064downarrow': {
        image: require('../assets/images/icons/064-down-arrow.png'),
        color: Colors.iconBackgroundColor
    },
    '065uparrows': {
        image: require('../assets/images/icons/065-up-arrows.png'),
        color: '#F4F0FE'
    },
    '066percentage': {
        image: require('../assets/images/icons/066-percentage.png'),
        color: '#00EFD1'
    },
    '067creditcard': {
        image: require('../assets/images/icons/067-credit-card.png'),
        color: '#00EFD1'
    },
    '068calculator': {
        image: require('../assets/images/icons/068-calculator.png'),
        color: '#4E5565'
    },
    '069percent': {
        image: require('../assets/images/icons/069-percent.png'),
        color: '#4E5565'
    },
    '070paperplane': {
        image: require('../assets/images/icons/070-paper-plane.png'),
        color: Colors.iconBackgroundColor
    },
    '071sign': {
        image: require('../assets/images/icons/071-sign.png'),
        color: '#F4F0FE'
    },
    // '072scale': {
    //     image: require('../assets/images/icons/072-scale.png'),
    //     color: '#27A2DB'
    // },
    '073bill': {
        image: require('../assets/images/icons/073-bill.png'),
        color: '#4E5565'
    },
    '074scholarship': {
        image: require('../assets/images/icons/074-scholarship.png'),
        color: iOSColors.tealBlue
    },
    '075moneyexchange': {
        image: require('../assets/images/icons/075-money-exchange.png'),
        color: iOSColors.red
    },
    '076creditcard1': {
        image: require('../assets/images/icons/076-credit-card-1.png'),
        color: Colors.iconBgRed
    },
    '077payment1': {
        image: require('../assets/images/icons/077-payment-1.png'),
        color: iOSColors.orange
    },
    '078creditcardpayment': {
        image: require('../assets/images/icons/078-credit-card-payment.png'),
        color: Colors.iconBackgroundColor
    },
    '079money2': {
        image: require('../assets/images/icons/079-money-2.png'),
        color: Colors.iconBackgroundColor
    },
    '080profit': {
        image: require('../assets/images/icons/080-profit.png'),
        color: '#00EFD1'
    },
    // '081piechart': {
    //     image: require('../assets/images/icons/081-pie-chart.png'),
    //     color: '#F4F0FE',
    //     // fullSize: true
    // },
    // '082award': {
    //     image: require('../assets/images/icons/082-award.png'),
    //     color: '#00EFD1'
    // },
    // '084mastercard': {
    //     image: require('../assets/images/icons/084-mastercard.png'),
    //     color: '#27A2DB'
    // },

    // '085bodycare': {
    //     image: require('../assets/images/icons/085-bodycare.png'),
    //     color: '#27A2DB'
    // },
    // '086family': {
    //     image: require('../assets/images/icons/086-family.png'),
    //     color: '#27A2DB'
    // },
    // '087foodanddrink': {
    //     image: require('../assets/images/icons/087-foodanddrink.png'),
    //     color: '#27A2DB'
    // },
    // '088-home': {
    //     image: require('../assets/images/icons/088-home.png'),
    //     color: '#27A2DB'
    // },
    // '089pets': {
    //     image: require('../assets/images/icons/089-pets.png'),
    //     color: '#27A2DB'
    // },
    // '090love': {
    //     image: require('../assets/images/icons/090-love.png'),
    //     color: '#27A2DB'
    // },
    // '091training': {
    //     image: require('../assets/images/icons/091-training.png'),
    //     color: '#27A2DB'
    // },
    // '092prescription': {
    //     image: require('../assets/images/icons/092-prescription.png'),
    //     color: '#27A2DB'
    // },


}

// Object.keys(icons).map((key) => {
//     icons[key].color = colors[Math.floor(Math.random() * colors.length)];
// })

// console.log(icons);
export default icons;