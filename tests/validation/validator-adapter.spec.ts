import { articleData } from "../mocks/article-data"
import { Validator } from "@/validation/validator.adapter"

describe("/src/validation", () => {
    function makeSut() {
        const sut = new Validator()
        return sut
    }
    test("there should be no return", () => {
        const sut = makeSut()
        const response = sut.addValidate(articleData.validData.body)
        expect(response).toBeUndefined()
    })
    test("should return title required", () => {
        const sut = makeSut()
        const response = sut.addValidate(articleData.withoutTitle.body)
        console.log(response);

        expect(response).toEqual({ title: ["Required"] })
    })
    test("should return img required", () => {
        const sut = makeSut()
        const response = sut.addValidate(articleData.withoutImg.body)
        console.log(response);

        expect(response).toEqual({ img: ["Required"] })
    })
    test("should return article required", () => {
        const sut = makeSut()
        const response = sut.addValidate(articleData.withoutArticle.body)
        console.log(response);

        expect(response).toEqual({ article: ["Required"] })
    })
})