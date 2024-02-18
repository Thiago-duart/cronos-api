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

        expect(response).toEqual({ title: ["Required"] })
    })
    test("should return img required", () => {
        const sut = makeSut()
        const response = sut.addValidate(articleData.withoutImg.body)

        expect(response).toEqual({ img: ["Required"] })
    })
    test("should return article required", () => {
        const sut = makeSut()
        const response = sut.addValidate(articleData.withoutArticle.body)

        expect(response).toEqual({ article: ["Required"] })
    })

    test("should return error => expected string, received number -- title", () => {
        const sut = makeSut()
        const response = sut.addValidate({
            title: 1,
            img: "valid-img",
            article: "valid-article",
        })

        expect(response).toEqual({
            title: ["Expected string, received number",]
        })
    })
    test("should return error => expected string, received number -- img", () => {
        const sut = makeSut()
        const response = sut.addValidate({
            title: "valid-img",
            img: 1,
            article: "valid-article",
        })

        expect(response).toEqual({
            img: ["Expected string, received number",]
        })
    })
    test("should return error => expected string, received number -- article", () => {
        const sut = makeSut()
        const response = sut.addValidate({
            title: "valid-img",
            img: "valid-img",
            article: 1,
        })

        expect(response).toEqual({
            article: ["Expected string, received number",]
        })
    })

})