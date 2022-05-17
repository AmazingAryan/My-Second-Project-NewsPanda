import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize: 9,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }

  articles = [
    {"status":"ok","totalResults":70,"articles":[{"source":{"id":null,"name":"CNBCTV18"},"author":"CNBCTV18.com","title":"'LIC shares are worth less than half the issue price', India's former Finance Secretary says - CNBCTV18","description":"India's former Finance Secretary Shubhash Chandra Garg has said that the true worth of the shares of India's public sector insurance behemoth Life Insurance Corporation of India is less than half the issue price. Check what he has said","url":"https://www.cnbctv18.com/market/stocks/lic-shares-are-worth-less-than-half-the-issue-price-says-indias-former-finance-secretary-13510772.htm","urlToImage":"https://images.cnbctv18.com/wp-content/uploads/2022/04/LIC-1019x573.jpg","publishedAt":"2022-05-17T07:19:00Z","content":"LIC listed at a discount as suspected. 2 crore shares, about 10% of the issue, sold and bought in first 15 minutes. Possibly, there is sponsored buying. True value is less than half the issue price. … [+116 chars]"},{"source":{"id":null,"name":"NDTV News"},"author":null,"title":"\"Doobey\": LIC IPO's Tepid Debut Triggers Meme Fest On Twitter - NDTV","description":"The LIC IPO listing comes as Indian equity benchmarks rose for a second consecutive session on Tuesday, while the rupee weakened to an all-time low.","url":"https://www.ndtv.com/india-news/lic-ipo-listing-doobey-lic-ipos-tepid-debut-triggers-meme-fest-on-twitter-2982793","urlToImage":"https://c.ndtvimg.com/2022-04/svbqeps_life-insurance-corporation-reuters-pic_650x400_06_April_22.jpg","publishedAt":"2022-05-17T07:14:56Z","content":"The LIC IPO followed a years-long effort by bankers and bureaucrats.\r\nLife Insurance Corporation (LIC) on Tuesday made stock market debut at Rs 865 per share, around nine per cent lower than the issu… [+2150 chars]"},{"source":{"id":null,"name":"Moneycontrol"},"author":"Moneycontrol News","title":"WPI inflation rises further to 15.08% in April from 14.55% a month back - Moneycontrol","description":"The rise in wholesale inflation in April beyond the 15 percent-mark comes after data released on May 12 showed the more closely-tracked headline retail inflation rate jumped to 7.79 percent last month – the highest since May 2014.","url":"https://www.moneycontrol.com/news/business/economy/wpi-inflation-rises-further-to-15-08-in-april-from-14-55-in-march-8515411.html","urlToImage":"https://images.moneycontrol.com/static-mcnews/2017/03/wheat-rice-stock-warehouse-pulses-grains-farmer-farm-output-sacks1-770x433.jpg","publishedAt":"2022-05-17T06:35:51Z","content":"India's inflation based on the Wholesale Price Index (WPI) rose further to 15.08 percent in April from 14.55 percent in March, according to data released by the commerce ministry on May 17.\r\nThe WPI … [+2400 chars]"},{"source":{"id":null,"name":"NDTV News"},"author":null,"title":"How China Lockdowns Are Impacting The World Including Tesla - NDTV","description":"The economic consequences from China's COVID-19 lockdowns are starting to be felt by companies and consumers across the globe, and expectations are that the reverberations will only get stronger.","url":"https://www.ndtv.com/world-news/how-china-lockdowns-are-impacting-the-world-including-tesla-2982585","urlToImage":"https://c.ndtvimg.com/2022-05/saa48568_china-covid_625x300_17_May_22.jpg","publishedAt":"2022-05-17T06:12:38Z","content":"Beijing's zero-tolerance approach to covid has idled factories and warehouses.\r\nThe economic consequences from China's COVID-19 lockdowns are starting to be felt by companies and consumers across the… [+8115 chars]"}]}
  ]
    
    constructor(){
        super();
        console.log("Hello I am a constructor from News componenet");
        this.state = {
           articles: this.articles,
           loading: false,
           page:1
        }
    }

    async componentDidMount(){
      let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apikey=a5922b9286504852a46048f21eb823c9&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({articles: parsedData.articles,
         totalResults: parsedData.totalResults,
        loading: false})

    }

    handlePrevClick = async ()=>{
      console.log("Previous");
      let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apikey=a5922b9286504852a46048f21eb823c9&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false
      })


    }
    handleNextClick = async () => {
      console.log("Next");
      if(!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))){
      let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apikey=a5922b9286504852a46048f21eb823c9&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
      }
    }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '30px 0px'}}><b> NewsPanda - Top Headlines</b></h1>
          {this.state.loading && <Spinner/>}
          
          <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description.slice(0, 50):""} imgurl={element.urlToImage} newsUrl={element.url}/>
            </div>
          })}
          </div>
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark"  onClick={this.handlePrevClick}>&larr; Prev</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
      </div>
      
    )
  }
}

export default News