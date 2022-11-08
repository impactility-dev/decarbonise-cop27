import { ethers } from 'ethers';

export class BigNumber {

  constructor(bigNumberOrString, decimals = 18) {
    this.decimals = decimals
    if (typeof bigNumberOrString === "string") {
      this.string = bigNumberOrString;
    } else if (bigNumberOrString._isBigNumber) {
      this.string = parseFloat(ethers.utils.formatUnits(bigNumberOrString, decimals));
    } else if (typeof bigNumberOrString === "number") {
      this.string = parseFloat(bigNumberOrString).toFixed(decimals);
    } else {
      throw new Error(`Unexpected type whilst creating BigNumber: ${typeof bigNumberOrString}`);
    }
  }

  asString() {
    return this.string;
  }

  asStringLimitedLength(digits = 4) {
    const precision = parseFloat(this.string).toPrecision(digits)
    const fixed = parseFloat(this.string).toFixed(digits - 1)
    // console.log("precision: ", precision, precision.length)
    // console.log("fixed: ", fixed, fixed.length)

    if (precision.length < fixed.length) {
      return precision;
    }
		return fixed;
  
  }

  asBigNumber() {
    return ethers.utils.parseUnits(this.string, this.decimals);
  }

  asFloat() {
    return parseFloat(this.string);
  }
}