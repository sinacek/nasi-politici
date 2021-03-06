import React from 'react'
import {createStructuredSelector} from 'reselect'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {getSearchResults, isSearchLoading, getSearchQuery} from '../../redux/selectors'
import LoadingBar from '../loadingBar/loadingBar'
import ProfilePicture from '../profilePicture/profilePicture'
import styles from './result.module.scss'
import { ReactComponent as ReportIcon } from '../../assets/images/report.svg';
import ReportModalTrigger from '../reportModal/reportModalTrigger'

function ResultRow({result}) {
	return (
    <Link className={styles.resultRow} to={`/detail/${result.id}`}>
      <div className={styles.resultItem}>
        <div className={styles.pictureWrapper} >
          <ProfilePicture src={`https://www.hlidacstatu.cz/Photo/${result.id}`} alt={result.surname}/>
        </div>
        <div className={styles.dataWrapper}>
          <div className={styles.nameWrapper}>
            <div className={styles.name}>{result.name} {result.surname}</div>
            <div className={styles.initialsWrapper}>
              {result.birthYear && <div className={styles.birthYear}>*{result.birthYear}</div>}
              <div className={styles.divider} />
              {result.currentParty && <div className={styles.currentParty}>{result.currentParty}</div>}
            </div>
          </div>
          <div className={styles.linkWrapper}>
            <div className={styles.link}>Zobrazit profil</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// TODO pouzit spravnou ikonku
function EmptyState({query}) {
	return (
		<div>
			<div className={styles.emptyTitle}>žádnou političku ani politka jsme nenašli :(</div>
			<div className={styles.explanationWrapper}>
				<div className={styles.nonPolitician}>„{query}“ buď není politik, nebo ho zatím nemáme v databázi.</div>
				<div className={styles.usage}>Nejlepší výsledky vyledávání dostanete zadáním celého jména.<br />
					Nepřesnosti v diakritice náš systém toleruje.
				</div>
				<ReportModalTrigger
					modalTitle={`${query}, vyhledávání`}
					className={styles.report}
				>
					<ReportIcon />
					<div className={styles.text}>Nahlásit chybu</div>
				</ReportModalTrigger>
				<div className={styles.face}></div>
			</div>
		</div>
	)
}

function Result({results, loading, query}) {
// TODO vyresit mnozne/jednotne cislo
	return (
		<React.Fragment>
      {loading && <LoadingBar />}
      {!loading && results && results.length === 0 && <EmptyState query={query} />}
      {!loading && results && !!results.length &&
        <div>
          <div className={styles.count}>Nalezeni {results.length} politici</div>
          <div className={styles.results}>{results.map(result => <ResultRow key={result.id} result={result} />)}</div>
        </div>}
		</React.Fragment>
  )
}

const mapStateToProps = createStructuredSelector({
  results: getSearchResults,
	loading: isSearchLoading,
  query: getSearchQuery,
})

export default connect(mapStateToProps)(Result);
